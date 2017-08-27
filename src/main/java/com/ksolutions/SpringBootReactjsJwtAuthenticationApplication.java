package com.ksolutions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@EnableConfigurationProperties(LiquibaseProperties.class)
public class SpringBootReactjsJwtAuthenticationApplication {

    private static final Logger LOG = LoggerFactory.getLogger(SpringBootReactjsJwtAuthenticationApplication.class);

    private static final String SPRING_PROFILE_DEFAULT = "spring.profiles.default";

    private final Environment env;

    public SpringBootReactjsJwtAuthenticationApplication(Environment env) {
        this.env = env;
    }

    public static void main(String[] args) throws UnknownHostException {
        SpringApplication app = new SpringApplication(SpringBootReactjsJwtAuthenticationApplication.class);
        addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        LOG.info("\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! Access URLs:\n\t" +
                        "Local: \t\thttp://localhost:{}\n\t" +
                        "External: \thttp://{}:{}\n\t" +
                        getH2Console(env) + "\n\t" +
                        "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                env.getProperty("server.port"),
                InetAddress.getLocalHost().getHostAddress(),
                env.getProperty("server.port"),
                env.getActiveProfiles());
    }

    private static String getH2Console(Environment env) throws UnknownHostException {
        return "H2 Console:\t" +
                "http://" +
                "localhost" +
                ":" +
                env.getProperty("server.port") + "/h2-console";
    }

    public static void addDefaultProfile(SpringApplication app) {
        Map<String, Object> defProperties = new HashMap<>();
        /*
        * The default profile to use when no other profiles are defined
        * This cannot be set in the <code>application.yml</code> file.
        * See https://github.com/spring-projects/spring-boot/issues/1219
        */
        defProperties.put(SPRING_PROFILE_DEFAULT, Constants.SPRING_PROFILE_DEVELOPMENT);
        app.setDefaultProperties(defProperties);
    }

    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(Constants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(Constants.SPRING_PROFILE_PRODUCTION)) {
            LOG.error("You have misconfigured your application! It should not run with both the 'dev' and 'prod' profiles at the same time.");
        }
    }

}
