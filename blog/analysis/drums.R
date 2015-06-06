setwd('~/git/csci183/blog/analysis/')

files808 <- list.files('samples/808')
files909 <- list.files('samples/909')
# read in stats for each file
stats808 <- vector(length = length(files808))
for (i in length(files808)) {
  stats808[i] <- get_wav_stats(sprintf('samples/808/%s', files808[i]))
}

all808 <- vector()
system.file(files808)
for (file in files808) {
  all808 <- all808 + 1  
}
all808 <- list()

# taken from http://stackoverflow.com/questions/12757685/batch-measurements-of-wav-files-with-sox-stats
get_wav_stats = function(wav_file) {
  rough_wav_stats = system(sprintf("sox %s -n stat 2>&1", wav_file), intern = TRUE)
  wav_stats = data.frame(do.call("rbind", strsplit(rough_wav_stats, split = ":")))
  names(wav_stats) = c("variable", "value")
  wav_stats = transform(wav_stats, value = as.numeric(as.character(value)))
  return(wav_stats)
}
