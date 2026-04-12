# Neural Nexus ML Challenge — Image Classification (EuroSAT-Based)

---

## Overview

This project builds a deep learning pipeline to classify satellite images into **10 land-use categories** using a pretrained convolutional neural network. The objective is to maximize **F1 Score** on unseen test data and generate a valid `FINAL.csv` submission.

---

## Dataset

- **Training samples:** 16,558  
- **Test samples:** 11,039  
- **Classes:** 10 (e.g., Forest, River, Highway, etc.)  
- **Format:**
  - `Train.csv` → IMAGE, LABEL  
  - `Test.csv` → IMAGE  
  - Images stored in folders  

---

## Sample Data

![Forest](https://github.com/phelber/EuroSAT/raw/master/2750/Forest/Forest_1.jpg)
![River](https://github.com/phelber/EuroSAT/raw/master/2750/River/River_1.jpg)
![Residential](https://github.com/phelber/EuroSAT/raw/master/2750/Residential/Residential_1.jpg)
![Highway](https://github.com/phelber/EuroSAT/raw/master/2750/Highway/Highway_1.jpg)

---

## Approach

### 1. Data Pipeline
- Load CSV metadata  
- Map image paths  
- Apply transformations:
  - Resize  
  - Normalize  
  - Augmentation (flip, rotation)

---

### 2. Model

- Architecture: **EfficientNet-B3 (Pretrained on ImageNet)**
- Modified final layer → 10 output classes  

---

### 3. Training Strategy

- Loss: CrossEntropyLoss  
- Optimizer: Adam  
- Learning Rate: 3e-4  
- Epochs: 8–12  
- Batch Size: 32  

---

### 4. Evaluation

- Validation split: 80/20  
- Metrics:
  - Accuracy  
  - **F1 Score (primary)**  

---

## Training Visualization

![Loss Curve](https://upload.wikimedia.org/wikipedia/commons/8/8c/Example_of_learning_curves.png)
![Confusion Matrix](https://upload.wikimedia.org/wikipedia/commons/2/26/Confusion_matrix.png)
![ROC Curve](https://upload.wikimedia.org/wikipedia/commons/6/6b/Roccurves.png)

---

## Output Format

Final submission must be:

```csv
IMAGE,LABEL
test_0.png,1
test_1.png,3
...
