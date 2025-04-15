# Concordia Campus Guide - Project Overview

This repository contains various components and scripts required for the Concordia Campus Guide project. Below is a description of each directory and its purpose:

## Directory Structure

### `build_scripts`
This folder contains scripts used for:
- Updating the backend cloud version.
- Building the Android APK for the frontend.

### `systemd_scripts`
This directory contains all the `systemd` scripts required to automate various services, including:
- Running the cloud version of the backend with a PostgreSQL database on Docker.
- Managing the ORS (OpenRouteService) and OTP (OpenTripPlanner) services.
- Executing the script that generates a release APK.
- Running the webhook listener to trigger the build script and provide the release APK.

### `ors` and `otp`
These directories house our custom Directions API implementations:
- **`ors`**: Handles car, bike, and walking transportation modes.
- **`otp`**: Manages public transportation (STM).  
Each directory contains its own README file with instructions on how to run the respective service.

### `reverse_proxy`
Contains the configuration files used with the Caddy web server for reverse proxying.

### `webhook-listener`
This folder includes a custom webhook script that:
- Gets triggered on each push to the `main` branch.
- Executes the build scripts.
- Provides a release APK.
