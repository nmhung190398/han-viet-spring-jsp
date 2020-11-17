package com.nmhung.api;


import com.nmhung.common.ResponseMessage;
import com.nmhung.model.BaseModel;
import com.nmhung.model.HanVietModel;
import com.nmhung.request.HanVietSearchRequest;
import com.nmhung.service.HanVietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class HanVietAPI {

    @Autowired
    HanVietService service;

    @PostMapping(value = "/api/han-viet/search")
    public ResponseEntity<ResponseMessage> search(@RequestBody HanVietSearchRequest request){
        return ResponseEntity.ok(service.search(request));
    }

    @PostMapping(value = "/api/han-viet/get")
    public ResponseEntity<ResponseMessage> getById(@RequestBody BaseModel model){
        return ResponseEntity.ok(service.get(model.getId()));
    }

    @PostMapping(value = "/api/han-viet/update")
    public ResponseEntity<ResponseMessage> update(@RequestBody HanVietModel model){
        return ResponseEntity.ok(service.edit(model));

    }

    @PostMapping(value = "/api/han-viet/add")
    public ResponseEntity<ResponseMessage> add(@RequestBody HanVietModel model){
        return ResponseEntity.ok(service.add(model));
    }
    @PostMapping(value = "/api/han-viet/delete")
    public ResponseEntity<ResponseMessage> delete(@RequestBody HanVietModel model){
        return ResponseEntity.ok(service.delete(model));
    }

    @PostMapping(value = "/api/han-viet/upload-excel")
    public ResponseEntity<ResponseMessage> uploadExcel(@RequestParam("file") MultipartFile file,
                                                       RedirectAttributes redirectAttributes){

        return ResponseEntity.ok(service.uploadExcel(file));
    }
    @PostMapping(value = "/api/han-viet/download")
    public ResponseEntity<ResponseMessage> download(@RequestBody HanVietSearchRequest request){
        return ResponseEntity.ok(service.download(request));
    }

}
