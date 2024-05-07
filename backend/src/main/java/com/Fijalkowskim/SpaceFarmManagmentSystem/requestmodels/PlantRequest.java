package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
public class PlantRequest {
    private String name;
}
