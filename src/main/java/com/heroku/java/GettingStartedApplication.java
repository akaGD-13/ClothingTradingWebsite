package com.heroku.java;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Map;

@SpringBootApplication
@Controller
public class GettingStartedApplication {
    private final DataSource dataSource;

    @Autowired
    public GettingStartedApplication(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/")
    public String loginhome() {
        return "login-registeration/login";
    }
    
    //home page
    @GetMapping("/homepage.html")
    public String home() {
        return "homepage";
    }
    @GetMapping("homepage.css")
    public String homepage_css() {
        return "css/homepage.css";
    }
    @GetMapping("/homepage.js")
    public String homepage_js() {
        return "js/homepage.js";
    }
    
    //login1
    @GetMapping("/login-registeration/login.html")
    public String login1() {
        return "login-registeration/login";
    }
    @GetMapping("/login-registeration/login.css")
    public String login_css1() {
        return "css/login.css";
    }
    @GetMapping("/login-registeration/login.js")
    public String login_js1() {
        return "js/login.js";
    }
    @GetMapping("/login-registeration/login-register.css")
    public String login_register_js1() {
        return "css/login-register.css";
    }
    @GetMapping("/login-registeration/login-register-api.js")
    public String login_reg_api_js1() {
        return "js/login-register-api.js";
    }
    @GetMapping("/login-registeration/margins.css")
    public String margins_css1() {
        return "css/margins.css";
    }
    
    //login 2
    @GetMapping("/login.html")
    public String login() {
        return "login-registeration/login";
    }
    @GetMapping("/login.css")
    public String login_css() {
        return "css/login.css";
    }
    @GetMapping("/login.js")
    public String login_js() {
        return "js/login.js";
    }
    @GetMapping("/login-register.css")
    public String login_register_js() {
        return "css/login-register.css";
    }
    @GetMapping("/login-register-api.js")
    public String login_reg_api_js() {
        return "js/login-register-api.js";
    }
    @GetMapping("/margins.css")
    public String margins_css() {
        return "css/margins.css";
    }
    
    //register
    @GetMapping("/login-registeration/register.html")
    public String register1() {
        return "login-registeration/register";
    }
    @GetMapping("/register.html")
    public String register() {
        return "login-registeration/register";
    }
    @GetMapping("/login-registeration/register.css")
    public String register_css() {
        return "css/register.css";
    }
    @GetMapping("/login-registeration/register.js")
    public String register_js() {
        return "js/register.js";
    }
    @GetMapping("/register.css")
    public String register_css1() {
        return "css/register.css";
    }
    @GetMapping("/register.js")
    public String register_js1() {
        return "js/register.js";
    }
    
    //closet
    @GetMapping("/closet.html")
    public String closet() {
        return "closet";
    }
    @GetMapping("/closet.css")
    public String closet_css() {
        return "css/closet.css";
    }
    @GetMapping("/closet.js")
    public String closet_js() {
        return "js/closet.js";
    }
    
    //API
    @GetMapping("/login-registeration/apis.js")
    public String api_js1() {
        return "js/apis.js";
    }
    @GetMapping("/apis.js")
    public String api_js2() {
        return "js/apis.js";
    }
    
    @GetMapping("/cleanUser")
    public void cleanUser() {
    	try (Connection connection = dataSource.getConnection()) {
            final var statement = connection.createStatement();
            statement.executeUpdate("DELETE FROM u1_0");
            System.out.println("clean user table");
            
//            String user = "CREATE TABLE IF NOT EXISTS u1_0 (user_id email_ password_ username)";
//            statement.executeUpdate(user);
            
            System.out.println("clean_user_table");

        } catch (Throwable t) {
        }
    }

    @GetMapping("/database")
    String database(Map<String, Object> model) {
        try (Connection connection = dataSource.getConnection()) {
            final var statement = connection.createStatement();
            statement.executeUpdate("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)");
            statement.executeUpdate("INSERT INTO ticks VALUES (now())");

            final var resultSet = statement.executeQuery("SELECT tick FROM ticks");
            final var output = new ArrayList<>();
            while (resultSet.next()) {
                output.add("Read from DB: " + resultSet.getTimestamp("tick"));
            }
            
//            String user = "CREATE TABLE IF NOT EXISTS u1_0 (user_id email_ password_ username)";
//            statement.executeUpdate(user);
            
            
            model.put("records", output);
            return "database";

        } catch (Throwable t) {
            model.put("message", t.getMessage());
            return "error";
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(GettingStartedApplication.class, args);
    }
}
