package com.ksolutions.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

@Component
@ConfigurationProperties(prefix = "custom", ignoreUnknownFields = false)
@Getter
@Setter
public class ApplicationProperties {

    private final Security security = new Security();

    private final CorsConfiguration cors = new CorsConfiguration();

    @Getter
    @Setter
    public static class Security {

        private final Authentication authentication = new Authentication();

        @Getter
        @Setter
        public static class Authentication {

            private final Jwt jwt = new Jwt();

            @Getter
            @Setter
            public static class Jwt {

                private String secret;

                private long tokenValidityInSeconds = 900L;

                private long refreshTokenValidityInSeconds = 1020L;

            }
        }
    }
}
