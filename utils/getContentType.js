export const getContentType = (fileExtension) => {

    
    if(typeof fileExtension !== "string"){
        return 'application/json'
    }

    fileExtension = fileExtension.toLowerCase()

    switch(fileExtension) {
        // Images
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        case '.svg':
            return 'image/svg+xml';
        case '.ico':
            return 'image/x-icon';

        // Documents & Text
        case '.pdf':
            return 'application/pdf';
        case '.txt':
            return 'text/plain';
        case '.html':
        case '.htm':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
        case '.mjs':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.xml':
            return 'application/xml';
        case '.csv':
            return 'text/csv';

        default:
            return 'application/json';
    }
}