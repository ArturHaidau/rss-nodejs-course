FROM postgres:14-alpine
RUN mkdir /logs
RUN chown postgres:postgres /logs
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_destination=stderr", "-c", "log_directory=/logs"]