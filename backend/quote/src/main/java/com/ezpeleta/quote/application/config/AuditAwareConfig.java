package com.ezpeleta.quote.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

@Configuration
public class AuditAwareConfig {

    @Bean
    public AuditorAware<String> auditorAwareImpl() {
        return () -> Optional.of("system");
        //system can be replaced with a dynamic value, for example, the currently authenticated user
    }
}
