# IPFS Bootstrap Node

An ECS cluster backed by EC2s with three containerized services, an IPFS node, an OrbitDB Pinnner, and an nginx server acting as a reverse proxy.

The EC2 instances are provided with an SSL certificates in order to allow browser based clients to connect to the IPFS node though secure web sockets on port 4003.

The certificate creation process is defined on the ec2's user data startup script. It uses certbot and the `certbot-dns-cloudflare` plugin, so a `secureString` SSM Parameter must exist with Cloudflae API token on the following format `dns_cloudflare_api_token = 0123456789abcdef0123456789abcdef01234567`.