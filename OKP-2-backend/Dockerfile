# Start with the appropriate base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS backend-builder
WORKDIR /backend

# Copy and restore the backend
COPY ./OKP-2-backend.csproj .
RUN dotnet restore

# Copy the rest of the files
COPY . .

# Generate and trust a development certificate
RUN dotnet dev-certs https --clean && \
    dotnet dev-certs https -ep ./https/aspnetapp.pfx -p password && \
    dotnet dev-certs https --trust

RUN dotnet publish . -c Release -o ./out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the published output from the build image
COPY --from=backend-builder /backend/out .

# Copy the development certificate
COPY --from=backend-builder /backend/https .
# Set the ASP.NET Core environment to development
ENV ASPNETCORE_ENVIRONMENT Development

# Configure the application to use HTTPS
ENV ASPNETCORE_URLS https://+:443;http://+:80
ENV ASPNETCORE_HTTPS_PORT 443
ENV ASPNETCORE_Kestrel__Certificates__Default__Password password
ENV ASPNETCORE_Kestrel__Certificates__Default__Path aspnetapp.pfx

# Expose the HTTP and HTTPS ports
EXPOSE 443
EXPOSE 80

# Start the backend
ENTRYPOINT ["dotnet", "OKP-2-backend.dll"]
