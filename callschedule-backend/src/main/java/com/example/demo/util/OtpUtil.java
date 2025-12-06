package com.example.demo.util;

import java.util.concurrent.ThreadLocalRandom;

public class OtpUtil {
    public static String generate4DigitOtp() {
        int n = ThreadLocalRandom.current().nextInt(1000, 10000);
        return String.valueOf(n);
    }
}
