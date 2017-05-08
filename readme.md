# Open Graph Link Data for Statamic
*Requirement:* Statamic v2.5.x, php-xml  
*Version:* 1.0.1

## What is this?
A field type and tag for obtaining and presenting meta tags, open graph tags and twitter cards from in your templates.

## Installation
- Rename the folder `LinkOgData` and copy it to your `site/addons` folder

*Note:* The specific meta data available depends on what the website supplies. When using this data you should take into account that it may not exist.

## Field Type
- Add the field type to one of your fieldsets
- Save the page or entry from CP
- Use the data in one of your templates

### Data Storage
The data is stored (and thus not dynamic or real time). `title`, `description`, `author`, and `keywords` if available are stored at the top level. Open Graph and Twitter cards are stored within `og` and `twitter` fields respectively. All available Open Graph and Twitter tags are saved, replacing any addtional `:`'s with `_`'s.

*Sample:*
```
link:
  url: https://wondereur.com
  og:
    title: Your access to cutting-edge international artists • Wondereur
    description: |
      Wondereur is a ground-breaking cultural platform reinventing how we relate to art. Discover, experience, invest. Worldwide.
    site_name: Wondereur
    url: https://www.wondereur.com/
    image: >
      https://d3d8q6fdip3x5i.cloudfront.net/artists/header_images/000/000/048/small/IMG_7567_2.jpg?1491336221
    image_type: image/jpeg
    image_width: "576"
    image_height: "342"
  twitter:
    site: @wondereur
    title: Your access to cutting-edge international artists • Wondereur
    description: |
      Wondereur is a ground-breaking cultural platform reinventing how we relate to art. Discover, experience, invest. Worldwide.
```

## Tag
When you need more real time meta data you can use the tag to fetch meta data in real time.

*Note:* If you do not use any additional caching a request for the meta data will be made on each page request. This could slow down your website and may be frowned down upon by the remote site.

It would be good practice to at least wrap your tag in a `{{ cache }}` tag pair.

*Sample:*
```
{{ link_og_data :url='link:url' }}
    {{ title }}<br />
    {{ description }}<br />
    {{ og:title }}<br />
    {{ og:description }}<br />
    {{ twitter:site }}<br />
    <img src="{{ og:image }}" />
{{ /link_og_data }}
```

## Version Log
- 1.0.1 Slight refactor & better handeling of lookup errors
- 1.0.0 Initial release
