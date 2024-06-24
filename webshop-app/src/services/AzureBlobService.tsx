import { BlobServiceClient } from '@azure/storage-blob';

const sasToken = "your-sas-token"; // This should be securely managed
const containerName = "product-imafes";
const storageAccountName = "techgiant";

class AzureBlobService {
    private blobServiceClient: BlobServiceClient;
    private containerClient: ReturnType<BlobServiceClient['getContainerClient']>;

    constructor() {
        this.blobServiceClient = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net?${sasToken}`
        );
        this.containerClient = this.blobServiceClient.getContainerClient(containerName);
    }

    async uploadImage(file: File): Promise<string> {
        const blobClient = this.containerClient.getBlockBlobClient(file.name);
        await blobClient.uploadData(file);
        return blobClient.url;
    }

    async downloadImage(fileName: string): Promise<Blob> {
        const blobClient = this.containerClient.getBlobClient(fileName);
        const downloadBlockBlobResponse = await blobClient.download(0);
        const blob = await downloadBlockBlobResponse.blobBody;

        if (blob) {
            return blob;
        } else {
            throw new Error("Unable to download image.");
        }
    }
}

export default new AzureBlobService();
