from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=120)
    initials = models.CharField(max_length=12)
    role = models.CharField(max_length=160)
    location = models.CharField(max_length=120)
    email = models.EmailField()
    github = models.URLField()
    linkedin = models.URLField()
    available = models.BooleanField(default=True)
    headline = models.TextField()
    bio = models.TextField()
    seo_title = models.CharField(max_length=180, blank=True)
    seo_description = models.TextField(blank=True)
    open_graph_title = models.CharField(max_length=180, blank=True)
    open_graph_description = models.TextField(blank=True)
    nav_links = models.JSONField(default=list, blank=True)
    ui_copy = models.JSONField(default=dict, blank=True)
    trust_items = models.JSONField(default=list, blank=True)
    service_items = models.JSONField(default=list, blank=True)
    featured_projects = models.JSONField(default=list, blank=True)
    resume_url = models.URLField(blank=True)
    skill_heading = models.CharField(max_length=160, blank=True)
    skill_copy = models.TextField(blank=True)
    about_heading = models.CharField(max_length=160, blank=True)
    about_copy = models.JSONField(default=list, blank=True)
    contact_heading = models.CharField(max_length=160, blank=True)
    contact_copy = models.TextField(blank=True)
    contact_note = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Stat(models.Model):
    profile = models.ForeignKey(Profile, related_name="stats", on_delete=models.CASCADE)
    value = models.CharField(max_length=24)
    label = models.CharField(max_length=80)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.value} {self.label}"


class SkillGroup(models.Model):
    profile = models.ForeignKey(Profile, related_name="skill_groups", on_delete=models.CASCADE)
    label = models.CharField(max_length=80)
    skills = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label


class Experience(models.Model):
    profile = models.ForeignKey(Profile, related_name="experience", on_delete=models.CASCADE)
    role = models.CharField(max_length=160)
    company = models.CharField(max_length=160)
    location = models.CharField(max_length=160)
    period = models.CharField(max_length=120)
    bullets = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.role} at {self.company}"


class Education(models.Model):
    profile = models.OneToOneField(Profile, related_name="education", on_delete=models.CASCADE)
    degree = models.CharField(max_length=180)
    institution = models.CharField(max_length=220)
    year = models.CharField(max_length=20)
    honors = models.CharField(max_length=120, blank=True)

    def __str__(self):
        return self.degree


class Certification(models.Model):
    profile = models.ForeignKey(Profile, related_name="certifications", on_delete=models.CASCADE)
    name = models.CharField(max_length=220)
    url = models.URLField()
    static_asset_path = models.CharField(max_length=220, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name
