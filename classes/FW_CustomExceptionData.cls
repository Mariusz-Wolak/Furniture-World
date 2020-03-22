public class FW_CustomExceptionData {
    public String name;
    public String message;
    public Integer code;

    public FW_CustomExceptionData(String name, String message) {
        this.name = name;
        this.message = message;
    }

    public FW_CustomExceptionData(String name, String message, Integer code) {
        this.name = name;
        this.message = message;
        this.code = code;
    }
}