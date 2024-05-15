package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dicttionaries.MeasureUnit;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class PlantRequest {
    private String name;

    private MeasureUnit measureUnit;
}