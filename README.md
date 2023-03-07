# Otomee-support-infra

Cloud infrastructure to support Otomee's operation.

This Repo consists of AWS Cloudformation templates to create infrastructure to **assist** the underlying decentralized architecture to run Otomee. Otomee is designed to work properly without these resources, but at the initial phase of Otomee, with few Otomee clients, the CID resolution process for the order book and node synchronization can be slow, thus a Bootstrap ipfs node can help peers find each other quicker.

## Structure

This project is broken into several modules, their purposes are:

* [`/ipfs-bootstrap-node/ecs-cluster.yml`](./ipfs-bootstrap-node/ecs-cluster.yml) A Cloudformation template to crete an EC2 backed ECS cluster.
* [`/ipfs-bootstrap-node/ipfs-node-service`](./ipfs-bootstrap-node/ipfs-node-service) A service to run an IPFS instance, compatible with Otomee's IPFS service.
* [`/ipfs-bootstrap-node/nginx-service`](./ipfs-bootstrap-node/nginx-service) A service to run an nginx server to serve as a reverse proxy.
