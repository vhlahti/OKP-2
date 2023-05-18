# Start with the appropriate base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS backend-builder
WORKDIR /backend

# Copy and restore the backend
COPY ./OKP-2-backend.csproj .
RUN dotnet restore

# Copy the rest of the files
COPY . .

# Build the backend
RUN dotnet publish -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the published output from the build image
COPY --from=backend-builder /backend/out .

# Expose the specified port
EXPOSE $PORT

# Start the backend
ENTRYPOINT ["dotnet", "OKP-2-backend.dll" , "--urls", "http://0.0.0.0:$PORT"]
