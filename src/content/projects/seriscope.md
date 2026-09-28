---
title: "SeriScope: A Low-Cost Edge-AI System for Fertility and Disease Assessment of Tassar Silkworm Eggs"
category: "AI & IoT"
status: "Completed"
year: 2025
summary: "An offline, low-cost Edge-AI tool that reads microscope images to detect pebrine disease and assess egg fertility in tassar silkworm grainages."
problem: "Pebrine, caused by Nosema bombycis, is one of the most harmful threats to sericulture. Diagnosing it means checking moth body fluid under a microscope by hand, which is slow, needs skilled people and is open to human error, so infected eggs can reach farmers."
objective: "Give grainages a fast, affordable diagnosis tool that works offline on small embedded hardware, so pebrine can be caught early and egg fertility assessed without a specialist or an internet connection."
workingMechanism: "A microscope camera captures images of the sample. The images are resized and normalised, then classified as bacteria, non-pebrine or pebrine by trained models that run offline on a small device. A second, lightweight pipeline based on texture and shape features gives an explainable cross-check. The live feed, predicted class and confidence score are shown on the SeriScope interface."
team:
  - "Tripathy Divyajyoti Senapati"
  - "Suryakanta Lenka"
mentor: "Tanmay Kumar Nayak"
technologies:
  - "Convolutional neural networks (VGG16, EfficientNet-B0/B3, ResNet-50, MicroNet)"
  - "PyTorch and ONNX Runtime for offline inference"
  - "OpenCV for camera input"
  - "Grad-CAM for explainability"
  - "GLCM, LBP and Hough-transform features with SVM and Random Forest"
materials:
  - "Bright-field microscope"
  - "Digital/USB microscope camera"
  - "Embedded, CPU-only computing hardware"
# ADD IMAGES (see notes): remove the # at the start of the lines below after saving the files.
cover:
  src: "/images/projects/seriscope.jpeg"
  alt: "SeriScope interface showing a live microscope image with predicted class and confidence"
  caption: "The SeriScope interface during real-time inference."
teamPhoto:
  - src: "/images/projects/tds.jpeg"
    alt: "Portrait of Tripathy Divyajyoti Senapati"
    caption: "Tripathy Divyajyoti Senapati"
  - src: "/images/projects/surya.jpeg"
    alt: "Portrait of Suryakanta Lenka"
    caption: "Suryakanta Lenka"
reportPdf: "/reports/seriscope-project-report.pdf"
featured: true
publishStatus: published
---

The team collected more than 1,400 real-world microscopy examples from tassar grainages in sericulture regions and trained five classification models on them. On the test set the best PyTorch model, VGG16, reached 98.68% accuracy, and the ONNX versions ran on CPU at about 15 to 47 ms per image.

The team also built a non-CNN pipeline using texture and shape features. It is easier to interpret and needs less computing power, which suits low-power field devices.

Field visits to the Sukinda Silk Farm and grainages gave the team real samples and expert guidance. Next steps under exploration include fluorescence microscopy and DNA-based confirmation such as PCR or LAMP.

SeriScope won a Gold Medal at the IRIS National Fair, was selected for Team India at ISEF 2026 in Phoenix, USA, and received a Special Award at ISEF 2026.