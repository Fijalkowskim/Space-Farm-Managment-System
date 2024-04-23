package com.Fijalkowskim.SpaceFarmManagmentSystem.configurations;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Control.class);
        config.exposeIdsFor(Cultivation.class);
        config.exposeIdsFor(Harvest.class);
        config.exposeIdsFor(MeasuredValue.class);
        config.exposeIdsFor(Person.class);
        config.exposeIdsFor(Plant.class);
        config.exposeIdsFor(Control.class);
        config.exposeIdsFor(Reading.class);
        config.exposeIdsFor(Stage.class);
        config.exposeIdsFor(Station.class);
        String theAllowedOrigins = "http://localhost:3000";
        cors.addMapping(config.getBasePath() + "/**" ).allowedOrigins(theAllowedOrigins);
    }
}