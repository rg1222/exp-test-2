# exp-test-2
A simple jpsych task designed according to experiment factory guidelines.

TO RUN LOCALLY:<br>
(from inside the directory containing the Dockerfile and startscript.sh)<br>
docker build --no-cache -t expfactory/experiments . <br>
docker run -d -p 80:80 -v ${PWD}/exp-test-2/data:/scif/data expfactory/experiments start <br>

Then, on any web browser, go to the address "localhost" (or enter 127.0.0.1) to begin the experiment. Results will be saved as a JSON file in the exp-test-2/data directory.

To bash into docker container:<br>
docker ps #to determine container ID (e.g., 8a8bed8c7f82)
docker exec -it 8a8bed8c7f82 bash

