package com.nmhung.service;

import com.nmhung.common.BaseService;
import com.nmhung.common.ResponseMessage;
import com.nmhung.conver.HanVietConver;
import com.nmhung.entity.HanVietEntity;
import com.nmhung.model.HanVietModel;
import com.nmhung.repository.HanVietRepository;
import com.nmhung.request.HanVietSearchRequest;
import com.nmhung.response.PagingResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Iterator;
import java.util.*;
@Service
public class HanVietService extends BaseService {

    final int COLUMN_INDEX_ID = 0;
    final int COLUMN_INDEX_AM_DOC = 1;
    final int COLUMN_INDEX_CHU_VIET = 2;
    final int COLUMN_INDEX_NGHIA = 3;
    final int COLUMN_INDEX_TU_GHEP = 4;
    final int COLUMN_INDEX_NGHIA_HAN = 5;
    final int COLUMN_INDEX_THANH_NGU = 6;
    final int COLUMN_INDEX_BO_THU = 7;
    final int COLUMN_INDEX_CHU_THICH = 8;

    @Autowired
    private HanVietRepository repository;

    @Autowired
    private HanVietConver conver;

    public ResponseMessage add(HanVietModel model) {
        return this.execute(message -> {
            repository.save(conver.toEtity(model).setAdd());
        });
    }

    public ResponseMessage edit(HanVietModel model) {
        return this.execute(message -> {
            HanVietEntity entity = repository.getOne(model.getId());
            if (entity == null) {
                throw new RuntimeException("Không tồn tại để sửa");
            }
            HanVietEntity save = conver.toEtity(model);
            save.MaintainData(entity);
            save = repository.save(save);
            message.data = conver.toModel(save);

        });
    }

    public ResponseMessage delete(HanVietModel model) {
        return this.execute(message -> {
            HanVietEntity entity = repository.getOne(model.getId());
            if (entity == null) {
                throw new RuntimeException("Không tồn tại");
            }
            repository.deleteById(model.getId());
            message.data = true;
        });
    }

    public ResponseMessage get(Long id) {
        return this.execute(message -> {
            HanVietEntity entity = repository.getOne(id);
            if (entity == null) {
                throw new RuntimeException("Không tồn tại");
            }
            message.data = conver.toModel(entity);
        });
    }

    public ResponseMessage search(HanVietSearchRequest request) {
        return this.execute(message -> {
            message.data = PagingResponse.of(repository.search(request).map(conver::toModel));
        });
    }

    public ResponseMessage download(HanVietSearchRequest request) {
        return this.execute(message -> {
            Workbook workbook = null;
            try {
                workbook = getWorkbook("YeuToHanViet.xlsx");
                Sheet sheet = workbook.createSheet("YeuToHanViet");
                List<HanVietEntity> entities = repository.gets(request);
                int rowIndex = 0;
                Row rowHeader = sheet.createRow(rowIndex);
                rowHeader.createCell(COLUMN_INDEX_ID).setCellValue("id");
                rowHeader.createCell(COLUMN_INDEX_AM_DOC).setCellValue("Âm đọc");
                rowHeader.createCell(COLUMN_INDEX_CHU_VIET).setCellValue("Chữ viết");
                rowHeader.createCell(COLUMN_INDEX_NGHIA).setCellValue("Nghĩa");
                rowHeader.createCell(COLUMN_INDEX_TU_GHEP).setCellValue("Từ ghép có chứa yếu tố Hán Việt");
                rowHeader.createCell(COLUMN_INDEX_NGHIA_HAN).setCellValue("Tầm nguyên chữ Hán");
                rowHeader.createCell(COLUMN_INDEX_THANH_NGU).setCellValue("Thành ngữ Hán Việt");
                rowHeader.createCell(COLUMN_INDEX_BO_THU).setCellValue("Bộ thủ");
                rowHeader.createCell(COLUMN_INDEX_CHU_THICH).setCellValue("Chú thích");
                rowIndex++;
                for(HanVietEntity entity : entities){
                    Row row = sheet.createRow(rowIndex);

                    Cell cell = row.createCell(COLUMN_INDEX_ID);
                    cell.setCellValue(entity.getId());

                    cell = row.createCell(COLUMN_INDEX_AM_DOC);
                    cell.setCellValue(entity.getAmDoc());

                    cell = row.createCell(COLUMN_INDEX_CHU_VIET);
                    cell.setCellValue(entity.getChuViet());

                    cell = row.createCell(COLUMN_INDEX_NGHIA);
                    cell.setCellValue(entity.getNghia());

                    cell = row.createCell(COLUMN_INDEX_TU_GHEP);
                    cell.setCellValue(entity.getTuGhep());

                    cell = row.createCell(COLUMN_INDEX_NGHIA_HAN);
                    cell.setCellValue(entity.getNghiaHan());

                    cell = row.createCell(COLUMN_INDEX_THANH_NGU);
                    cell.setCellValue(entity.getThanhNgu());

                    cell = row.createCell(COLUMN_INDEX_BO_THU);
                    cell.setCellValue(entity.getBoThu());

                    cell = row.createCell(COLUMN_INDEX_CHU_THICH);
                    cell.setCellValue(entity.getChuViet());

                    rowIndex++;
                }

                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                workbook.write(bos);
                byte[] barray = bos.toByteArray();
                message.data = Base64.getEncoder().encodeToString(barray);
            } catch (IOException e) {
                message.status = false;
                throw  new RuntimeException(e.getMessage());

            }

        });

    }

    public ResponseMessage uploadExcel(MultipartFile file) {
        return this.execute(message -> {
            if (file.isEmpty()) {
                throw new RuntimeException("Chưa chọn file");
            }
            String fileName = file.getOriginalFilename();
            try {
                InputStream is = file.getInputStream();
                List<HanVietEntity> models = readExcelFile(is,fileName);
                if(models.isEmpty()){
                    throw new RuntimeException("Không đọc được dữ liệu");
                }
                repository.saveAll(models);
            } catch (IOException e) {
                message.status = false;
                throw  new RuntimeException(e.getMessage());
            }
            message.status = true;

        });
    }

    public List<HanVietEntity> readExcelFile(InputStream is,String fileName) throws IOException {
// Get workbook
        Workbook workbook = getWorkbook(is, fileName);
        List<HanVietEntity> models = new ArrayList<>();
        Sheet sheet = workbook.getSheetAt(0);



// Get all rows
        Iterator<Row> iterator = sheet.iterator();

        while (iterator.hasNext()){
            Row nextRow = iterator.next();
            if (nextRow.getRowNum() == 0) {
                // Ignore header
                continue;
            }
            HanVietEntity model = new HanVietEntity();

            // Get all cells
            Iterator<Cell> cellIterator = nextRow.cellIterator();

            while (cellIterator.hasNext()){

                Cell cell = cellIterator.next();
                Object cellValue = getCellValue(cell);
                if (cellValue == null || cellValue.toString().isEmpty()) {
                    continue;
                }
                // Set value for book object
                int columnIndex = cell.getColumnIndex();
                switch (columnIndex) {
                    case COLUMN_INDEX_ID:
                        Long id = null;
                        try{
                            id = new BigDecimal((double) cellValue).longValue();
                        }catch (Exception e){}
                        model.setId(id);
                        break;
                    case COLUMN_INDEX_AM_DOC:
                        model.setAmDoc(cellValue.toString());
                        break;
                    case COLUMN_INDEX_BO_THU:
                        model.setBoThu(cellValue.toString());
                        break;
                    case COLUMN_INDEX_CHU_VIET:
                        model.setChuViet(cellValue.toString());
                        break;
                    case COLUMN_INDEX_NGHIA_HAN:
                        model.setNghiaHan(cellValue.toString());
                        break;
                    case COLUMN_INDEX_THANH_NGU:
                        model.setThanhNgu(cellValue.toString());
                        break;

                    case COLUMN_INDEX_TU_GHEP:
                        model.setTuGhep(cellValue.toString());
                        break;
                    case COLUMN_INDEX_NGHIA:
                        model.setNghia(cellValue.toString());
                        break;
                    case COLUMN_INDEX_CHU_THICH:
                        model.setChuThich(cellValue.toString());
                        break;
                    default:
                        break;
                }
            }

            models.add(model);

        }

        return models;
    }
    private Workbook getWorkbook(InputStream inputStream, String fileName) throws IOException {
        Workbook workbook = null;
        if (fileName.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(inputStream);
        } else if (fileName.endsWith("xls")) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }

        return workbook;
    }
    private Workbook getWorkbook(String excelFilePath) throws IOException {
        Workbook workbook = null;

        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook();
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook();
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }

        return workbook;
    }

    // Get cell value
    private static Object getCellValue(Cell cell) {
        CellType cellType = cell.getCellTypeEnum();
        Object cellValue = null;
        switch (cellType) {
            case BOOLEAN:
                cellValue = cell.getBooleanCellValue();
                break;
            case FORMULA:
                Workbook workbook = cell.getSheet().getWorkbook();
                FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
                cellValue = evaluator.evaluate(cell).getNumberValue();
                break;
            case NUMERIC:
                cellValue = cell.getNumericCellValue();
                break;
            case STRING:
                cellValue = cell.getStringCellValue();
                break;
            case _NONE:
            case BLANK:
            case ERROR:
                break;
            default:
                break;
        }

        return cellValue;
    }

}
