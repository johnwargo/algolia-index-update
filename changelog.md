# Changelog

## 20230522

Added option for file-based repository for Algolia credentials instead of registry-based credentials.
## 20230502 - Version 0.2.0

For my own personal use, I need to upload indices for multiple sites, so I updated the program to accept an environment variable prefix to use when collection the API key and such. 

I also removed the --default flag requiring you to provide the path to the index file manually. Previously it defaulted to `_site/algolia.json`.