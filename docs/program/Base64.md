import java.util.Base64;

public class Base64Util {
public Base64Util() {
}

    public static String decode(String base64String) {
        if (base64String == null) {
            return base64String;
        } else {
            try {
                byte[] decodedBytes = Base64.getDecoder().decode(base64String);
                String decodedString = new String(decodedBytes);
                return decodedString;
            } catch (Exception var3) {
                Exception e = var3;
                throw new RuntimeException(e);
            }
        }
    }

    public static String encode(String str) {
        String s = null;
        if (str == null) {
            return str;
        } else {
            try {
                s = Base64.getEncoder().encodeToString(str.getBytes());
                return s;
            } catch (Exception var3) {
                Exception e = var3;
                throw new RuntimeException(e);
            }
        }
    }
}