package PaintTool.server;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class FileStorageService {
    private static final Path UPLOAD_DIR = Paths.get("server/src/main/resources/uploads");

    public void save(MultipartFile file) throws IOException {
        if (file.getOriginalFilename()==null) throw new IOException("Filename Is Missing");
        Files.createDirectories(UPLOAD_DIR);
        Files.write(UPLOAD_DIR.resolve(file.getOriginalFilename()), file.getBytes());
    }

}
