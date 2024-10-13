package ro.tuc.ds2020.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ro.tuc.ds2020.jwt.JwtRequestFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public SecurityConfig(JwtRequestFilter jwtRequestFilter){
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers ("/user/login","/auth/**")
                .permitAll()
                .requestMatchers ("/user/**").hasAuthority ("admin")
                .requestMatchers ("/user/**").authenticated ()
                .requestMatchers ("api/v1/demo-controller/admin").hasAuthority ("admin")
                .requestMatchers ("api/v1/demo-controller/admin").authenticated ()
                .requestMatchers ("api/v1/demo-controller/client").hasAuthority ("client")
                .requestMatchers ("api/v1/demo-controller/client").authenticated ()
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
