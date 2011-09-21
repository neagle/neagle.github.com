---
layout: post
title: "Easier Post Creation for Jekyll with Bash"
summary: Adding new posts in Jekyll is a lot easier with a bash script to generate the date, create the file, and add the necessary YAML automatically.
---
The biggest reason to use "Jekyll":https://github.com/mojombo/jekyll is, in my opinion, its simplicity and convenience for people who work with files for a living. If changing directories and making files is what you do all day, then writing posts by creating files will just feel like The Way It Should Be. You'll love that you don't have to log into a web interface to add posts. If you'd _rather_ log into a web app, I'm not sure why on earth you'd use Jekyll: it's too minimalistic to offer any huge advantages over the many great CMSs out there today.

After a few weeks of using Jekyll, I found that it was a bit of a chore to think of today's date and type it out whenever I wanted to create a post. Since I was adding a second post type called bits to my blog for frequent, short posts it became even more of an issue.

So I created a bash script to make this easier.

I've written about three or four bash scripts in my entire life, so it takes me a bit of time and work to look everything up. In case you're in the same boat, I'm including the script below along with URLs for the references I used along with a few notes.

Here's the complete script:

{% highlight bash %}
#!/bin/bash
# Create a new post with today's date and prompt for the title.

# Config
editor="vim"
format="textile"

# Get layout via getopts (-l)
# --
# http://wiki.bash-hackers.org/howto/getopts_tutorial

while getopts ":l:" opt; do
    case $opt in
        l)
            layout=$OPTARG
            ;;
        :) echo "$opt requires an argument" >&2
            exit 1
            ;;
    esac
done

# Set default config values
# --
# http://www.cyberciti.biz/tips/howto-setting-default-values-for-shell-variables.html

: ${layout:="post"}


# I like giving myself a polite greeting.
# --
# Date codes: http://linux.about.com/od/commands/l/blcmdl1_date.htm

echo "---"
echo "Creating a new ${layout} for" `date +%A", "%B" "%e", "%Y`"."
echo ""
read -p "Enter the title: " title 

# Turn spaces into dashes
# --
# http://stackoverflow.com/questions/1469849/how-to-split-one-string-into-multiple-strings-in-bash-shell

for word in $title
do
    dashedTitle=${dashedTitle}-${word}
done

# Convert title to lowercase
# --
# http://stackoverflow.com/questions/2264428/converting-string-to-lower-case-in-bash-shell-scripting
# http://www.kclug.org/pipermail/kclug/2003-April/015084.html

dashedTitle="`echo ${dashedTitle} | tr '[A-Z]' '[a-z]'`"

# Create a filename with the date, dashed title, and format 
filename="`date +%Y-%m-%d`${dashedTitle}.${format}"

echo $filename

touch $filename

# Add initial YAML to the top of the new bit
echo "---" >> $filename
echo "layout: ${layout}" >> $filename
echo "title: \"${title}\"" >> $filename
echo "summary:" >> $filename
echo "---" >> $filename
echo "" >> $filename

# Open in vim and go to the end of the file ( + )
# --
# http://stackoverflow.com/questions/268123/vim-how-to-start-inserting-at-the-end-of-the-file-in-one-step

${editor} + $filename
{% endhighlight %}

You'll notice I created a layout option that can be passed in using @-l@. I use multiple post layouts on the blog, the most important of which are *post* and *bit*. Bits are very small posts that aren't included in the main list on the homepage or in my Atom feed.

I created two aliases (these should go in your @.bashrc@ file) to simplify creation of posts and bits:

{% highlight bash %}
alias post="./post.sh"
alias bit="./post.sh -l bit"
{% endhighlight %}

The script uses post as the default type. On running, the script

* prompts me for a title
* uses today's date plus a lowercase and dash-separated version of the title for the new post's filename
* prepopulates the post with the YAML I use for posts
* opens the new post in vim

So to create this post, I typed:

{% highlight bash %}
$ post
$ ---
$ Creating a new post for Wednesday, September 21, 2011.
$ 
$ Enter the title: Easier Post Creation for Jekyll with Bash
{% endhighlight %}

This created @2011-09-21-easier-post-creation-for-jekyll-with-bash.textile@, added my YAML, and popped it up in vim. Nice.

h3. One last item on my wish list 

I'd really like to find a solution for tab completion when I have a directory full of similarly prefixed files.

{% highlight bash %}
2011-08-30-upholstery-a-css3-pattern.textile                 2011-09-09-my-first-compass-mixin-text-3d.textile            2011-09-21-easier-post-creation-for-jekyll-with-bash.textile
2011-08-31-how-to-output-curly-brackets-in-jekyll.textile    2011-09-11-color-ripples-canvas-toy.textile                  2011-09-21-open-a-directory-in-finder-from-terminal.textile
2011-08-31-jekyll-not-parsing-includes.textile               2011-09-13-compass.textile 
{% endhighlight %}

If I have a directory like the one above, I'd love to be able to type @col<TAB>@ and have it expand to @2011-09-11-color-ripples-canvas-toy.textile@. In other words, the completion regex would match for a date string and disregard that prefix when matching filenames.

This may well be possible - even trivial - for someone smarter than I. I did find a great example of "something similar":http://stackoverflow.com/questions/3238983/writing-a-custom-bash-completion-rule for vim that'll let you add a @.completion@ file to any directory with a static prefix that will allow you to type, say, @vim <TAB>@ and have it expand to @vim _myprefix@.

Let me know if you have any suggestions for my bash script - as I said, I'm a bash n00b, and feedback is welcome.
