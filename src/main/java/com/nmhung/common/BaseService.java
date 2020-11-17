package com.nmhung.common;

import java.util.function.Consumer;

public class BaseService {
    public ResponseMessage execute(Consumer<ResponseMessage> consumer){
        ResponseMessage message = new ResponseMessage();
        message.status = true;
        try{
            consumer.accept(message);
        }catch (Exception e){
            message.message = e.getMessage();
            message.status = false;
        }
        return message;
    }
}
