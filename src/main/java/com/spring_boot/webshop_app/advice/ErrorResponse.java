package com.spring_boot.webshop_app.advice;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "error")
public class ErrorResponse
{
    public ErrorResponse(String message, List<String> details) {
        super();
        this.message = message;
        this.details = details;
    }

    //General error message about nature of error
    protected String message;

    //Specific errors in API request processing
    protected List<String> details;

    //Getter and setters
}