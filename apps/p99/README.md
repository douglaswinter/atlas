# P99 Optical Ptychography Test Rig

P99 is a high-precision testing rig utilising a laser source, synchronized X-Y-Z nanopositioning stages, and area detectors to perform Ptychographic imaging.

This repository serves as the Primary User Interface, acting as the central hub for experiment orchestration. It facilitates communication between two core pillars:

    Control (BlueAPI): Handles the hardware abstraction layer, managing the synchronized motion of nanopositioning stages and triggering the laser/detector hardware.

    Analysis (Workflows): A dedicated data pipeline that consumes raw detector frames to perform phase retrieval and high-resolution image reconstruction.

## Releasing

This app is released using tags of the form:

`P99@x.y.z`
