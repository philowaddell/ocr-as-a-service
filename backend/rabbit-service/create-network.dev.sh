echo "  Attempting to create docker bridge network (ocr-network):"
docker network create \
--driver bridge \
--subnet=172.16.0.0/24 \
--gateway=172.16.0.1 \
-o "com.docker.network.bridge.enable_icc"="true" \
-o "com.docker.network.bridge.enable_ip_masquerade"="true" \
-o "com.docker.network.bridge.host_binding_ipv4"="0.0.0.0" \
-o "com.docker.network.driver.mtu"="1500" \
ocr-network
echo ""