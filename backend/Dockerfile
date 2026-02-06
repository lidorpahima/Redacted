# Dockerfile for Backend (FastAPI)
# For AWS Lambda deployment

FROM public.ecr.aws/lambda/python:3.11

# Copy requirements
COPY requirements.txt ${LAMBDA_TASK_ROOT}/

# Install dependencies
RUN pip install --no-cache-dir -r ${LAMBDA_TASK_ROOT}/requirements.txt

# Copy application code
COPY app/ ${LAMBDA_TASK_ROOT}/app/
COPY data/ ${LAMBDA_TASK_ROOT}/data/

# Set the Lambda handler
# For Lambda: Use mangum to wrap FastAPI
# CMD ["app.main.handler"]

# For local Docker (non-Lambda):
# Uncomment the line below and comment out the Lambda CMD
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
