package com.ksolutions.security.jwt;

import com.ksolutions.config.ApplicationProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private final Logger LOG = LoggerFactory.getLogger(TokenProvider.class);
    private final ApplicationProperties properties;
    private String secretKey;
    private long tokenValidityInMilliseconds;
    private long refreshTokenValidityInMilliseconds;

    public TokenProvider(ApplicationProperties properties) {
        this.properties = properties;
    }

    @PostConstruct
    public void init() {
        this.secretKey = properties.getSecurity().getAuthentication().getJwt().getSecret();
        this.tokenValidityInMilliseconds = 1000 * properties.getSecurity().getAuthentication().getJwt().getTokenValidityInSeconds();
        this.refreshTokenValidityInMilliseconds = 1000 * properties.getSecurity().getAuthentication().getJwt().getRefreshTokenValidityInSeconds();
    }

    public String createToken(Authentication authentication) {
        return createToken(authentication, this.tokenValidityInMilliseconds);
    }

    public String createRefreshToken(Authentication authentication) {
        return createToken(authentication, this.refreshTokenValidityInMilliseconds);
    }

    private String createToken(Authentication authentication, long validityPeriod) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        long now = (new Date()).getTime();
        Date validity = new Date(now + validityPeriod);
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        org.springframework.security.core.userdetails.User principal = new org.springframework.security.core.userdetails.User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            LOG.info("Invalid JWT signature: " + e.getMessage());
            return false;
        }
    }
}
