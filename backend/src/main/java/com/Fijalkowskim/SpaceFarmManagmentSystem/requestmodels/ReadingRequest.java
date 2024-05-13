package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import lombok.Data;

@Data
public class ReadingRequest {
    private int value;

    private long measuredValueId;

    private long controlId;
}
