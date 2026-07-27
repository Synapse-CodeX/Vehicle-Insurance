# Use an official Python 3.10 image from Docker Hub
FROM python:3.10-slim-buster

# Set the working directory
WORKDIR /app

# Copy ONLY the requirements file first to leverage Docker caching
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . /app

# Expose the port
EXPOSE 5000

# Command to run your app
CMD ["python3", "app.py"]
