package com.ezpeleta.quote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
@EnableScheduling
public class QuoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuoteApplication.class, args);
	}

}
