package petstore;

import com.intuit.karate.junit5.Karate;

class KarateTest {

    @Karate.Test
    Karate testCrud() {
        return Karate.run("petstore-crud").relativeTo(getClass());
    }
}