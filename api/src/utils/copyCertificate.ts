import fs from 'fs';
import path from 'path';

const certSourcePath = path.join(__dirname, 'src', 'certs', 'ca.pem');
const distFolder = path.join(__dirname, 'dist', 'certificates');
const certDestinationPath = path.join(distFolder, 'ca.pem');

if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder, { recursive: true });
  console.log('Složka "dist/certificates" byla vytvořena.');
}

if (fs.existsSync(certSourcePath)) {
  fs.copyFileSync(certSourcePath, certDestinationPath);
  console.log('Certifikát byl zkopírován do dist/certificates');
} else {
  console.error('Certifikát ca.pem nebyl nalezen v src/certs/');
}
