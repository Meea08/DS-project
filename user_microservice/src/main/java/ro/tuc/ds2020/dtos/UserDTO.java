package ro.tuc.ds2020.dtos;

import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.UUID;

public class UserDTO {
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private String password;
    @NotNull
    private String role;

    public UserDTO () {
    }

    public UserDTO (UUID id, String name, String password, String role) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole () {
        return role;
    }

    public void setRole (String role) {
        this.role = role;
    }

    public String getPassword () {
        return password;
    }

    public void setPassword (String password) {
        this.password = password;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass () != o.getClass ()) return false;
        UserDTO personDTO = (UserDTO) o;
        return Objects.equals (id, personDTO.id) && Objects.equals (name, personDTO.name) && Objects.equals (role,
                personDTO.role);
    }

    @Override
    public int hashCode () {
        return Objects.hash (id, name, role);
    }
}
