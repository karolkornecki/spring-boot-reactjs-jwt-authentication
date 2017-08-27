package com.ksolutions.dto;

import com.ksolutions.model.Authority;
import com.ksolutions.model.Constants;
import com.ksolutions.model.User;
import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDTO implements Serializable {

    private Long id;

    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String login;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    private Set<String> authorities;

    public UserDTO(User user) {
        this(user.getId(), user.getLogin(), user.getFirstName(), user.getLastName(),
                user.getEmail(), user.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet()));
    }

    public UserDTO(Long id, String login, String firstName, String lastName,
                   String email, Set<String> authorities) {

        this.id = id;
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.authorities = authorities;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "login='" + login + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", authorities=" + authorities +
                "}";
    }
}
