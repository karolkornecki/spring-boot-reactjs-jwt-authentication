package com.ksolutions.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ksolutions.security.SecurityUtils;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public abstract class AbstractAuditingEntity implements Serializable {

    @CreatedBy
    @Column(name = "CREATED_BY", nullable = false, length = 50, updatable = false)
    @JsonIgnore
    private String createdBy;

    @CreatedDate
    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    @JsonIgnore
    private LocalDateTime createdDate = LocalDateTime.now();

    @LastModifiedBy
    @Column(name = "LAST_MODIFIED_BY", length = 50)
    @JsonIgnore
    private String lastModifiedBy;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_DATE")
    @JsonIgnore
    private LocalDateTime lastModifiedDate = LocalDateTime.now();

    @Version
    @Column(name = "VERSION")
    private Long version;

    @PrePersist
    public void preInsert() {
        String login = SecurityUtils.getCurrentUserLogin();
        LocalDateTime now = LocalDateTime.now();
        setCreatedBy(login);
        setCreatedDate(now);

        setLastModifiedBy(login);
        setLastModifiedDate(now);
    }

    @PreUpdate
    public void preUpdate() {
        String login = SecurityUtils.getCurrentUserLogin();
        LocalDateTime now = LocalDateTime.now();

        setLastModifiedBy(login);
        setLastModifiedDate(now);
    }

}
