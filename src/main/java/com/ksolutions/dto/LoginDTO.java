package com.ksolutions.dto;

import com.ksolutions.model.Constants;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
public class LoginDTO implements Serializable {

    @Pattern(regexp = Constants.LOGIN_REGEX)
    @NotNull
    @Size(min = 1, max = 50)
    private String username;

    @NotNull
    @Size(min = 4, max = 100)
    private String password;

    @Override
    public String toString() {
        return "LoginDTO{" +
                "password='*****'" +
                ", username='" + username + '\'' +
                '}';
    }
}
