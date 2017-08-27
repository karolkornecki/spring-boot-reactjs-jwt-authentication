package com.ksolutions.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JWTTokenDTO {

    private String idToken;

    private String refreshToken;

    public JWTTokenDTO(String idToken, String refreshToken) {
        this.idToken = idToken;
        this.refreshToken = refreshToken;
    }

    @JsonProperty("id_token")
    public String getIdToken() {
        return idToken;
    }

    @JsonProperty("id_refresh_token")
    public String getRefreshToken() {
        return refreshToken;
    }

}
