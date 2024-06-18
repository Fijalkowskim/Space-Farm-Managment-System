package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class MeasuredValueRequest {
    private String name;

    private long measureUnitId;
}