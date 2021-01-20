package com.cmpe202.teamtrendz.homefinder;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class HomefinderApplicationTests {

	private static final Logger logger = LogManager.getLogger(HomefinderApplicationTests.class);

	@Test
	void contextLoads() {
		logger.info("@@@@ contextLoads() -- here!");
	}

}
