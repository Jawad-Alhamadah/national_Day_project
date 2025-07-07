package PaintTool.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.nio.file.*;
import java.util.HashMap;
import org.springframework.http.HttpStatus;

import org.springframework.web.multipart.MultipartFile;
@RestController
public class UploadImageController {


    public FileStorageService fileStorageService;

    @Autowired
    public UploadImageController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("uploadImage")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<HashMap<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
        HashMap<String, String> response = new HashMap<>();
        try {
            fileStorageService.save(file);
            response.put("status", "success");
            response.put("message", "File uploaded: " + file.getOriginalFilename());
            response.put("filename", file.getOriginalFilename());

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(response);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error uploading file: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header("Content-Type", "application/json")
                    .body(response);
        }
    }

}
