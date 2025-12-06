package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckSlotResponse {
    private boolean available;
    private long bookedCount;
}
