# Kubernetes Setup Guide 🚀

## 🎯 Quick Setup Steps (Without deploy.sh)

### **Step 1: Install Docker**
```bash
# Windows: Download Docker Desktop from docker.com
# Verify installation
docker --version
docker run hello-world
```

### **Step 2: Install kubectl**
```bash
# Windows (PowerShell as Admin)
choco install kubernetes-cli

# Verify
kubectl version --client
```

### **Step 3: Install Minikube**
```bash
# Windows (PowerShell as Admin)
choco install minikube

# Verify
minikube version
```

### **Step 4: Start Minikube**
```bash
# Start cluster
minikube start --driver=docker

# Verify cluster is running
minikube status
kubectl cluster-info
```

### **Step 5: Build Docker Image**
```bash
# Navigate to project directory
cd kubernetes

# Build image
docker build -t kisanjena/kubernetes-api:latest .

# Verify image
docker images | grep kubernetes-api
```

### **Step 6: Deploy to Kubernetes**
```bash
# Apply deployment configuration
kubectl apply -f k8s/deployment.yaml

# Apply service configuration
kubectl apply -f k8s/service.yaml

# Or apply all at once
kubectl apply -f k8s/
```

### **Step 7: Verify Deployment**
```bash
# Check deployments
kubectl get deployments

# Check pods (wait until READY shows 2/2)
kubectl get pods

# Check services
kubectl get svc
```

### **Step 8: Access Application**
```bash
# Get service URL
minikube service kubernetes-api-service --url

# Or open in browser
minikube service kubernetes-api-service
```

### **Step 9: View Logs (Optional)**
```bash
# View all pod logs
kubectl logs -l app=kubernetes-api

# Follow logs in real-time
kubectl logs -l app=kubernetes-api -f
```

### **Step 10: Clean Up (When Done)**
```bash
# Delete deployment and service
kubectl delete -f k8s/

# Stop Minikube
minikube stop

# Delete Minikube cluster (optional)
minikube delete
```

---

## 🔄 If You Deleted Docker Images/Containers

If you accidentally deleted everything, follow these recovery steps:

```bash
# 1. Stop and delete corrupted Minikube
minikube delete --all --purge

# 2. Remove Minikube config (if delete fails)
Remove-Item -Path "$env:USERPROFILE\.minikube" -Recurse -Force

# 3. Start fresh Minikube
minikube start --force

# 4. Rebuild Docker image
docker build -t kisanjena/kubernetes-api:latest .

# 5. Deploy again
kubectl apply -f k8s/

# 6. Verify
kubectl get pods
```

---

## 📋 Essential Commands Reference

### **Docker Commands**
```bash
# Build image
docker build -t image-name:tag .

# List images
docker images

# List containers
docker ps -a

# Remove container
docker rm container-id

# Remove image
docker rmi image-name:tag

# View logs
docker logs container-name

# Clean up everything
docker system prune -a
```

### **Minikube Commands**
```bash
# Start cluster
minikube start

# Stop cluster
minikube stop

# Delete cluster
minikube delete

# Check status
minikube status

# Get cluster IP
minikube ip

# Access service
minikube service service-name --url

# Open dashboard
minikube dashboard

# SSH into node
minikube ssh
```

### **kubectl Commands**
```bash
# Apply configuration
kubectl apply -f file.yaml

# Get resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all

# Describe resource (detailed info)
kubectl describe pod pod-name

# View logs
kubectl logs pod-name
kubectl logs -l app=label-name -f

# Delete resources
kubectl delete -f file.yaml
kubectl delete pod pod-name

# Execute command in pod
kubectl exec -it pod-name -- /bin/sh

# Scale deployment
kubectl scale deployment deployment-name --replicas=3

# Check cluster info
kubectl cluster-info
kubectl get nodes
```

---

## 🐛 Common Issues & Fixes

### **Issue 1: ImagePullBackOff**
```bash
# Check if image exists locally
docker images

# Rebuild image
docker build -t kisanjena/kubernetes-api:latest .

# Or use imagePullPolicy: Never in deployment.yaml
```

### **Issue 2: Pods Not Ready**
```bash
# Check pod status
kubectl describe pod pod-name

# Check logs
kubectl logs pod-name

# Common fix: Wait for health checks
kubectl get pods --watch
```

### **Issue 3: Cannot Access Service**
```bash
# Get service URL
minikube service service-name --url

# Check if pods are running
kubectl get pods

# Check service endpoints
kubectl get endpoints
```

### **Issue 4: Minikube Won't Start**
```bash
# Delete and restart
minikube delete
minikube start --force

# Or with specific driver
minikube start --driver=docker
```

---

## 📁 Project Structure

```
kubernetes/
├── Dockerfile              # Docker image configuration
├── index.js               # Node.js application
├── package.json           # Dependencies
├── compose.yaml           # Docker Compose (alternative to K8s)
└── k8s/
    ├── deployment.yaml    # K8s Deployment config (2 replicas)
    └── service.yaml       # K8s Service config (NodePort)
```

---

## 🎓 What Each File Does

### **Dockerfile**
- Defines how to build the Docker image
- Uses Node.js 18 Alpine as base
- Copies code and installs dependencies
- Exposes port 5173

### **deployment.yaml**
- Creates 2 pod replicas
- Sets resource limits (CPU/Memory)
- Configures health checks (readiness/liveness)
- Injects environment variables

### **service.yaml**
- Exposes pods via NodePort
- Maps port 5173 to external access
- Load balances traffic across pods

---

## 🚀 Complete Workflow

```bash
# 1. Prerequisites
docker --version
kubectl version --client
minikube version

# 2. Start Minikube
minikube start

# 3. Build & Deploy
docker build -t kisanjena/kubernetes-api:latest .
kubectl apply -f k8s/

# 4. Verify
kubectl get pods
kubectl get svc

# 5. Access
minikube service kubernetes-api-service --url

# 6. Test
curl http://$(minikube ip):$(kubectl get svc kubernetes-api-service -o jsonpath='{.spec.ports[0].nodePort}')

# 7. Monitor
kubectl logs -l app=kubernetes-api -f

# 8. Clean up
kubectl delete -f k8s/
minikube stop
```

---

## 💡 Pro Tips

1. **Use `--watch` to monitor changes**
   ```bash
   kubectl get pods --watch
   ```

2. **Check logs from all pods**
   ```bash
   kubectl logs -l app=kubernetes-api --tail=50
   ```

3. **Port forward for debugging**
   ```bash
   kubectl port-forward pod-name 8080:5173
   ```

4. **Scale on demand**
   ```bash
   kubectl scale deployment kubernetes-api --replicas=5
   ```

5. **Quick restart**
   ```bash
   kubectl rollout restart deployment kubernetes-api
   ```

---

**Ready to deploy? Start with Step 1! 🎯**
