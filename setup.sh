#!/bin/bash
echo "##### Updating System #####"
sudo apt-get update -y

echo "##### Installing NVIDIA Drivers and CUDA #####"
# Add NVIDIA package repositories
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
sudo sh -c 'echo "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64 /" > /etc/apt/sources.list.d/cuda.list'
sudo sh -c 'echo "deb https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64 /" > /etc/apt/sources.list.d/cuda_learn.list'

# Install CUDA and cuDNN
sudo apt-get update -y
sudo apt-get install -y cuda libcudnn8 libcudnn8-dev

echo "##### Installing Python and Pip #####"
sudo apt-get install -y python3 python3-pip

echo "##### Installing PyTorch with CUDA Support #####"
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu113

echo "##### Installing FastAPI and Uvicorn #####"
pip3 install fastapi uvicorn

echo "##### Environment Setup Complete #####" 