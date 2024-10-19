ifneq ("$(wildcard .env)","")
	include .env
	export
endif

.PHONY: install
install: ## Install Python requirements.
	python -m pip install --upgrade pip setuptools wheel poetry
	poetry lock
	poetry install --no-root

.PHONY: nvidia-tf-train
nvidia-tf-train: ## Run the project.
	poetry run python -m nvidia_tensorflow_deep.app.train

.PHONY: nvidia-to-train
nvidia-to-train: ## Run the project.
	poetry run python -m nvidia_pytorch_deep.app.train

.PHONY: nvidia-tf
nvidia-tf: ## Run the project.
	poetry run python -m nvidia_tensorflow_deep.app.predict

.PHONY: nvidia-to
nvidia-tf: ## Run the project.
	poetry run python -m nvidia_pytorch_deep.app.predict


.PHONY: api
api: ## Run the project.
	fastapi dev main.py


.PHONY: clean
clean: ## Clean project's temporary files.
	find . -wholename '*/.ipynb_checkpoints' -exec rm -rf {} +
	find . -name '__pycache__' -exec rm -rf {} +
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.log' -exec rm -f {} +

.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sed 's/Makefile://g' | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'