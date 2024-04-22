package com.Fijalkowskim.SpaceFarmManagmentSystem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

@SpringBootApplication
public class SpaceFarmManagmentSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceFarmManagmentSystemApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(DataSource dataSource) {
		return args -> {
			Resource dataScript = new ClassPathResource("data.sql");
			new ResourceDatabasePopulator(dataScript).execute(dataSource);
		};
	}

}
